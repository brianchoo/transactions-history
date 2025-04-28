// Simulate API call with potential failures
export const fetchTransactions = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 10% chance to fail
      const isFail = Math.random() < 0.1;
      if (isFail) {
        reject(
          new Error(
            "Fail to load transactions. Refresh the page again to load transactions."
          )
        );
      } else {
        resolve();
      }
    }, 1000);
  });
};
