// Export a function named 'useDateFormater' that takes a date string as input
export const useDateFormater = (date: string) => {
  // Define formatting options for the date using the Intl.DateTimeFormat API
  const options: Intl.DateTimeFormatOptions = {
    month: "long", // Display the full name of the month (e.g., "January")
    day: "numeric", // Display the day as a numeric value (e.g., "1", "31")
    year: "numeric", // Display the full year as a numeric value (e.g., "2025")
  };

  // Use Intl.DateTimeFormat to format the input date string based on the defined options
  // Parse the input string into a Date object to ensure proper formatting
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
