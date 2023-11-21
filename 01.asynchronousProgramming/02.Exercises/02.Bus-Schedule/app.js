function solve() {

    const stopInfoElem = document.querySelector("div#info span.info");
    const departBtn = document.getElementById("depart");
    const arriveBtn = document.getElementById("arrive");

    let nextStopId = "depot";
    let stopName = ""

    async function depart() {
        console.log('Depart TODO...');

        try {
            const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`);

            if (!response.ok) {
                const error = new Error();
                error.message = response.statusText
                error.status = response.status

                throw error;
            }

            const data = await response.json();

            stopName = data.name;
            nextStopId = data.next;

            stopInfoElem.textContent = `Next stop ${stopName}`;
            departBtn.disabled = true;
            arriveBtn.disabled = false;
        } catch (err) {
            stopInfoElem.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    function arrive() {
        console.log('Arrive TODO...');

        stopInfoElem.textContent = `Arriving at ${stopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();