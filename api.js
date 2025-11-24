export async function fetchChallenges() {
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges', {
        headers: { 'Accept': 'application/json' }
    });

    if (!res.ok) {
        throw new Error(res.status + ' Could not load challenges ' + res.statusText);
    }

    const data = await res.json();
    return data.challenges;
}

export async function getAvailableTimes(challengeID) {
    const date = document.querySelector("#date").value;
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=' + date + '&challenge' + challengeID, {
        headers: { 'Accept': 'application/json' }
    });

    if(!res.ok) {
        throw new Error(res.status + ' Could not fetch available times ' + res.statusText);
    }

    const data = await res.json();
    return data;
}

export async function postBooking(data) {
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/booking/reservations', {
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

    if(!res.ok) {
        throw new Error(res.status + ' Could not upload booking data ' + res.statusText);
    }
}