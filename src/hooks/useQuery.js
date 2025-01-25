import { useQuery } from "react-query";
import api from "../api/api";



export const useFetchMyShortUrls = (token, onError) => {

    return useQuery(
        "my-shortenurls",
        async () => {
            return await api.get(`/api/urls/myurls`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        {
            select: (data) =>{
                const sortedData = data.data.sort(
                    (a,b) =>new Date(b.createdDate) - new Date(a.createdDate)
                );
                // console.log(data);
                return sortedData;
            },
            onError,
            staleTime: 5000
        }
    );
};




export const useFetchTotalClicks = (token, onError, timePeriod) => {
    // Get the current date
    const currentDate = new Date();

    // Calculate dynamic start and end dates based on the selected time frame
    let startDate, endDate;

    switch (timePeriod) {
        case "month":
            // Set to last month
            const lastMonth = new Date();
            lastMonth.setMonth(currentDate.getMonth() - 1);
            startDate = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, "0")}-01`;
            endDate = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, "0")}-${new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0).getDate()}`;
            break;

        case "3months":
            // Set to last 3 months
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
            startDate = `${threeMonthsAgo.getFullYear()}-${String(threeMonthsAgo.getMonth() + 1).padStart(2, "0")}-01`;
            endDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()}`;
            break;

        case "year":
        default:
            // Set to entire current year
            const currentYear = currentDate.getFullYear();
            startDate = `${currentYear}-01-01`;
            endDate = `${currentYear}-12-31`;
            break;
    }

    return useQuery(
        ["url-totalclick", startDate, endDate],
        async () => {
            return await api.get(`/api/urls/totalClicks?startDate=${startDate}&endDate=${endDate}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        {
            select: (data) =>{
                const covertToArray = Object.keys(data.data).map((key) => ({
                    clickDate: key,
                    count: data.data[key],
                }));
                
                // console.log(data);
                return covertToArray;
            },
            onError,
            staleTime: 5000
        }
    );
};
