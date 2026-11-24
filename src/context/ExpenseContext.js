import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// This key is used only to name the app's saved data in device storage.
const storageKey = "centsible.expenseTracker.v1";
// The app allows up to six quick-add shortcuts.
const maxQuickAdds = 6;

// These shortcuts are used the first time the app starts.
const defaultQuickAdds = [
  { id: "coffee", label: "Coffee", amount: "7" },
  { id: "lunch", label: "Lunch", amount: "40" },
  { id: "ride2school", label: "Tricycle Fare", amount: "15" },
];

// These values are used when no saved data exists.
const defaultData = {
  expenses: [],
  weeklyBudget: 250,
  monthlyBudget: 900,
  quickAdds: defaultQuickAdds,
};

// Sharing data through React context lets every screen read and update it.
const ExpenseContext = createContext(null);

// Check that a saved expense has all fields in the correct format.
function isExpense(expense) {
  return (
    expense &&
    typeof expense.id === "string" &&
    Number.isFinite(expense.amount) &&
    expense.amount > 0 &&
    typeof expense.description === "string" &&
    typeof expense.category === "string" &&
    typeof expense.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(expense.date)
  );
}

// Convert saved JSON text into a safe app data object.
function readStoredData(value) {
  const parsed = JSON.parse(value);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Saved app data has an unexpected format.");
  }
  if (!Array.isArray(parsed.expenses) || !parsed.expenses.every(isExpense)) {
    throw new Error("Saved expenses are invalid.");
  }

  const quickAdds = Array.isArray(parsed.quickAdds)
    ? parsed.quickAdds.filter(
        (item) =>
          item &&
          typeof item.id === "string" &&
          typeof item.label === "string" &&
          typeof item.amount === "string",
      )
    : defaultQuickAdds;

  return {
    expenses: parsed.expenses,
    weeklyBudget:
      Number.isFinite(parsed.weeklyBudget) && parsed.weeklyBudget >= 0
        ? parsed.weeklyBudget
        : defaultData.weeklyBudget,
    monthlyBudget:
      Number.isFinite(parsed.monthlyBudget) && parsed.monthlyBudget >= 0
        ? parsed.monthlyBudget
        : defaultData.monthlyBudget,
    quickAdds: quickAdds.slice(0, maxQuickAdds),
  };
}

export function ExpenseProvider({ children }) {
  // Keep the current app data and storage status together in one provider.
  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [storageError, setStorageError] = useState("");
  const storageQueue = useRef(Promise.resolve());

  // Reload saved data when the user asks to try again after a storage error.
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setIsReady(false);
    setLoadError("");
    try {
      const savedData = await AsyncStorage.getItem(storageKey);
      setData(savedData === null ? defaultData : readStoredData(savedData));
      setIsReady(true);
    } catch (error) {
      setLoadError(
        `Could not load saved data: ${error.message || "Storage is unavailable."}`,
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isActive = true;

    AsyncStorage.getItem(storageKey)
      .then((savedData) => {
        if (!isActive) return;
        setData(savedData === null ? defaultData : readStoredData(savedData));
        setIsReady(true);
      })
      .catch((error) => {
        if (isActive) {
          setLoadError(
            `Could not load saved data: ${error.message || "Storage is unavailable."}`,
          );
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const savedData = JSON.stringify(data);
    storageQueue.current = storageQueue.current
      .then(() => AsyncStorage.setItem(storageKey, savedData))
      .then(() => setStorageError(""))
      .catch((error) => {
        setStorageError(
          `Changes could not be saved: ${error.message || "Storage is unavailable."}`,
        );
      });
  }, [data, isReady]);

  const addExpense = useCallback((expense) => {
    setData((current) => ({
      ...current,
      expenses: [expense, ...current.expenses],
    }));
  }, []);

  const deleteExpense = useCallback((id) => {
    setData((current) => ({
      ...current,
      expenses: current.expenses.filter((expense) => expense.id !== id),
    }));
  }, []);

  const saveBudgets = useCallback((weeklyBudget, monthlyBudget) => {
    setData((current) => ({ ...current, weeklyBudget, monthlyBudget }));
  }, []);

  const updateQuickAdd = useCallback((id, field, value) => {
    setData((current) => ({
      ...current,
      quickAdds: current.quickAdds.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
  }, []);

  const addQuickAdd = useCallback(() => {
    setData((current) => {
      if (current.quickAdds.length >= maxQuickAdds) return current;
      return {
        ...current,
        quickAdds: [
          ...current.quickAdds,
          { id: `quick-add-${Date.now()}`, label: "", amount: "" },
        ],
      };
    });
  }, []);

  const removeQuickAdd = useCallback((id) => {
    setData((current) => ({
      ...current,
      quickAdds: current.quickAdds.filter((item) => item.id !== id),
    }));
  }, []);

  const resetStoredData = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      await storageQueue.current;
      await AsyncStorage.removeItem(storageKey);
      setData(defaultData);
      setStorageError("");
      setIsReady(true);
    } catch (error) {
      setLoadError(
        `Could not clear saved data: ${error.message || "Storage is unavailable."}`,
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      ...data,
      isLoading,
      loadError,
      storageError,
      loadData,
      resetStoredData,
      addExpense,
      deleteExpense,
      saveBudgets,
      updateQuickAdd,
      addQuickAdd,
      removeQuickAdd,
    }),
    [
      data,
      isLoading,
      loadError,
      storageError,
      loadData,
      resetStoredData,
      addExpense,
      deleteExpense,
      saveBudgets,
      updateQuickAdd,
      addQuickAdd,
      removeQuickAdd,
    ],
  );

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export function useExpenseData() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseData must be used inside ExpenseProvider.");
  }
  return context;
}
