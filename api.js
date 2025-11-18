async function getChallenges() {
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();
    return data;
}

async function getAvailableTimes(challengeID) {
    const date = document.querySelector("#date").value;
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=' + date + '&challenge' + challengeID);
    const data = await res.json();
    return data;
}

async function postBooking(data) {
    await fetch('https://lernia-sjj-assignments.vercel.app/api/booking/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            challenge: data.challengeID,
            name: data.customerName,
            email: data.customerEmail,
            date: data.bookedDate,
            time: data.bookedTime,
            participants: data.participants
        })
    });
}