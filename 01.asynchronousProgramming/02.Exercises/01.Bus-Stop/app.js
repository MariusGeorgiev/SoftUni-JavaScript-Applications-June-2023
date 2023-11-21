async function getInfo() {

    // 1. get busId from elements
    // 2. fetch data from http://localhost:3030/jsonstore/bus/businfo/:busId
    // 3. parse response from 2.
    // 4. error handling 
    // 5. add li elements per bus -> "Bus {busId} arrives in {time} minutes"

    const busesListElement = document.getElementById("buses");
    busesListElement.innerHTML = "";

    const stopId = document.getElementById("stopId").value;

    try {
        // document.getElementById("stopName").textContent = "Loading...";

        // await new Promise((resolve, reject) => {
        //     setTimeout(() =>{
        //         resolve();
        //     }, 1000);
        // });

    const response = await fetch(
        `http://localhost:3030/jsonstore/bus/businfo/${stopId}`
        );

        if(!response.ok) {
            const error = new Error(response.statusText);

            throw error;
        }

        const data = await response.json();
       
        document.getElementById("stopName").textContent = data.name;

        Object.entries(data.buses).forEach(([busId, time]) => {
            const liElement = document.createElement("li");
            liElement.textContent = `Bus ${busId} arrives in ${time} minutes`;
            busesListElement.appendChild(liElement);
        });
    } catch (err) {
        console.log("...err...", err);
        
        document.getElementById("stopName").textContent = "Error";
    }
}