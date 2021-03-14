import moment from 'moment';

export const logMetricsAndEvents = async (eventData) => {

    try {
        let response = await fetch(process.env.REACT_APP_LAMBDA_FN_ENDPOINT, {

            method: "POST",
            body: JSON.stringify(eventData),
            headers: {
                "Content-Type" : "application/json",
                "X-Api-Key": `${process.env.REACT_APP_LAMBDA_API_KEY}`
            }

        });
        console.log("EXECUTED LAMBDA FUNCTION");
        console.log(response);
    } catch (error) {
        console.log(error);
    }
} 

export const nearestMinutes = (interval, someMoment) => {
    const roundedMinutes = Math.round(someMoment.clone().minute() / interval) * interval;
    return someMoment.clone().minute(roundedMinutes).second(0);
}

export const nearest15min = () => nearestMinutes(15, moment());