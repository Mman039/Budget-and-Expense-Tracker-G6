import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Header } from "../components/Header";
import { SectionTitle } from "../components/SectionTitle";
import { StatCard } from "../components/StatCard";
import { categories } from "../data/categories";
import {
  colors,
  getBreakdownFillStyle,
  expenseTrackerStyles as styles,
} from "../styles/expenseTrackerStyles";
import { formatAmount as money } from "../utils/currency";

/**
 * Shows spending insights and fetches a live PHP-to-USD reference rate.
 */
export function StatsScreen({ expenses, monthTotal }) {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [rateError, setRateError] = useState("");
  const [isLoadingRate, setIsLoadingRate] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    async function fetchExchangeRate() {
      setIsLoadingRate(true);
      setRateError("");
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/PHP", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Exchange service returned ${response.status}.`);
        }
        const result = await response.json();
        const rate = result?.rates?.USD;
        if (
          result?.result !== "success" ||
          !Number.isFinite(rate) ||
          rate <= 0
        ) {
          throw new Error("The exchange service returned an invalid rate.");
        }
        if (isActive) {
          setExchangeRate({
            usd: rate,
            updatedAt: result.time_last_update_utc || "",
          });
        }
      } catch (error) {
        if (isActive && error.name !== "AbortError") {
          setRateError(
            "The live exchange rate could not be loaded. Check your connection and try again.",
          );
        }
      } finally {
        if (isActive) setIsLoadingRate(false);
      }
    }

    fetchExchangeRate();
    return () => {
      isActive = false;
      controller.abort();
    };
  }, [retryCount]);

  const highest = expenses.reduce(
    (max, expense) => Math.max(max, expense.amount),
    0,
  );
  const categoryTotals = categories.map((category) => ({
    name: category.name,
    total: expenses
      .filter((expense) => expense.category === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0),
  }));
  const topCategory = categoryTotals.reduce(
    (top, category) => (category.total > top.total ? category : top),
    categoryTotals[0],
  );
  const average = monthTotal / new Date().getDate();

  return (
    <>
      <Header eyebrow="UNDERSTAND YOUR HABITS" title="Your stats" />
      <Text style={styles.helperText}>
        Insights from your spending this month.
      </Text>
      <View style={styles.statGrid}>
        <StatCard
          label="Daily average"
          value={money(average)}
          icon="calendar-outline"
          color={colors.blue}
        />
        <StatCard
          label="Highest expense"
          value={highest > 0 ? money(highest) : money(0)}
          icon="cash-outline"
          color={colors.orange}
        />
        <StatCard
          label="Top category"
          value={monthTotal > 0 ? topCategory.name : "No spending yet"}
          icon="trophy-outline"
          color={colors.green}
        />
      </View>
      <SectionTitle title="Category breakdown" />
      <View style={styles.card}>
        {monthTotal === 0 ? (
          <Text style={styles.helperText}>
            Add an expense to see your category breakdown.
          </Text>
        ) : (
          categoryTotals
            .filter((category) => category.total > 0)
            .map((category) => (
            <View key={category.name} style={styles.breakdownRow}>
              <Text style={styles.breakdownName}>{category.name}</Text>
              <View style={styles.breakdownTrack}>
                <View
                  style={getBreakdownFillStyle(
                    category.total / Math.max(monthTotal, 1),
                  )}
                />
              </View>
              <Text style={styles.breakdownValue}>{money(category.total)}</Text>
            </View>
            ))
        )}
      </View>
      <SectionTitle
        title="Live exchange rate"
        action="Refresh"
        onAction={() => setRetryCount((count) => count + 1)}
      />
      <View style={styles.card}>
        {isLoadingRate && !exchangeRate ? (
          <ActivityIndicator color={colors.blue} />
        ) : exchangeRate ? (
          <>
            <Text style={styles.progressLabel}>
              ₱1,000 = ${(exchangeRate.usd * 1000).toFixed(2)} USD
            </Text>
            <Text style={styles.transactionDate}>
              PHP to USD · Updated {exchangeRate.updatedAt || "recently"}
            </Text>
            {isLoadingRate ? (
              <ActivityIndicator
                color={colors.blue}
                style={{ marginTop: 12 }}
              />
            ) : null}
            {rateError ? (
              <Text style={[styles.helperText, { color: colors.warning }]}>
                {rateError} Showing the last loaded rate.
              </Text>
            ) : null}
          </>
        ) : (
          <>
            <Text style={styles.helperText}>{rateError}</Text>
            <Pressable
              onPress={() => setRetryCount((count) => count + 1)}
              style={{ alignItems: "center", flexDirection: "row", gap: 8 }}
              accessibilityRole="button"
            >
              <Ionicons name="refresh-outline" size={18} color={colors.blue} />
              <Text style={styles.sectionAction}>Try again</Text>
            </Pressable>
          </>
        )}
      </View>
    </>
  );
}
