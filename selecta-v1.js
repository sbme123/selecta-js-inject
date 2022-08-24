
// sortingProductOptions IS SORTING THE DATA FOR TAB ONE OPTIONS. It's fetching the data form the Sheety API

const fetchDataTabOne = async (model) => {
    const url = `https://api.sheety.co/1e5171a440d1e6a1ff583cf15820565f/testGccSelectaOptions/${model}`;
  
    const resp = await fetch(url);
  
    const data = await resp.json();
  
    const parsedData = Object.keys(data)[0];
  
    const value = data[parsedData];
  
    return value;
  };
  
  const sortingProductOptions = async (model, option, id) => {
    const dataICanUse = await fetchDataTabOne(model);
  
    // SORTING GPU0 OPTIONS
    const sortingGpu0Options = () => {
      let newArray = dataICanUse.filter(
        (item) => item[option] !== "" && item[option] !== undefined
      );
      let mappedData = newArray.map((item) => item[option]);
  
      const mappingFinalOptions = (choice) => {
        return ` 
                <option value='${choice}' class='dropdown-option-cpu'>${choice}</option>
            `;
      };
  
      // Join is removing the unexpetced comma
      document.getElementById(`dropdown-select-${id}`).innerHTML = `
            ${mappedData.map(mappingFinalOptions).join("")} 
            `;
    };
  
    sortingGpu0Options();
  };
  
  // Get the sever from the page name
  const pageName = window.location.pathname

//   slice(0, -5).slice(1);
  
  sortingProductOptions(`${pageName}`, "cpu0", "cpu-0");
  sortingProductOptions(`${pageName}`, "cpu1", "cpu-1");
  sortingProductOptions(
    `${pageName}`,
    "memoryCapacityRequired",
    "memory-capacity"
  );
  sortingProductOptions(`${pageName}`, "memoryConfig", "memory-config");
  sortingProductOptions(`${pageName}`, "m2Drives", "m2-drives");
  sortingProductOptions(`${pageName}`, "typeOfDrive", "type-of-drive");
  sortingProductOptions(`${pageName}`, "numberOfDrives", "num-of-drives");
  sortingProductOptions(
    `${pageName}`,
    "capacityStorageDriveSize",
    "storage-drive-size"
  );
  
  // Form submit stuff
  
  const formSubmit = async () => {
    document.getElementById("submit-btn").innerText =
          "Loading...";
    const cpu0 = document.getElementById("dropdown-select-cpu-0").value;
    const cpu1 = document.getElementById("dropdown-select-cpu-1").value;
    const name = document.getElementById("input-name").value;
    const userEmail = document.getElementById("input-email").value;
  
  
    try {
      const email = await fetch("https://selecta-api.vercel.app/api/form-submit", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          //  Fill in the rest
          CPU1: cpu0,
          CPU2: cpu1,
          NAME: name,
          EMAIL: userEmail,
        }),
      });
  
      const response = await email.json();
  
      // Update UI
  
      if (response.status === 200) {
        document.getElementById("submit-btn").innerText =
          "Submit";
        // window.location.href = "http://127.0.0.1:5500/success.html";
        alert("Submitted");
      } else {
        document.getElementById("error").innerText =
          "There was an error submitting the form";
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  // Make the formSubmit function available to the global scope
  window.formSubmit = formSubmit;
  
  