const hours = document.getElementById("hour");
const minutes = document.getElementById("minute");
const seconds = document.getElementById("second");
const set_time = document.getElementById("set_time");
const lists = document.getElementById("list");
let time = [];
let pause = false;

const updateTimersDisplay = () => {
  const timerHTML =
    time.length === 0
      ? "<h3>No Timer Available</h3>"
      : time
          .map((timer, index) => {
            const hours = Math.floor(timer.remaining / 3600);
            const minutes = Math.floor((timer.remaining % 3600) / 60);
            const seconds = timer.remaining % 60;

            return `
                  <div class="time-body id=timer">
                    <h3>Time Left</h3>
                    <div class="time-input">
                      <div class="time">
                        <h1>${hours}</h1>
                        :
                        <h1>${minutes}</h1>
                        :
                        <h1>${seconds}</h1>
                      </div>
                      <button id="set_time" onclick="deleteTimer(${index})">Delete</button>
                      <button id="set_time" onclick="StopTimer(${index})">Stop</button>
                    
                    
                      </div>
                  </div>
                `;
          })
          .join("");

  lists.innerHTML = timerHTML;
};

const startTimer = (index) => {
  const timerId = setInterval(() => {
    time[index].remaining--;

    if (time[index].remaining <= 0) {
      clearInterval(timerId);

      // Update the display with the new timer list
      updateTimersDisplay();

      // Play the audio when the timer reaches 0
      const audioElement = document.getElementById("timerAudio");
      audioElement.src = "./mixkit-video-game-bomb-alert-2803.wav";
      audioElement.play();

      setTimeout(() => {
        time.splice(index, 1);
        updateTimersDisplay();
      }, 5000); // Remove the expired timer design change after 5 seconds (adjust as needed)
    }
  }, 1000);
  time[index].timerId = timerId;
};

const setTime = () => {
  const Hour = () => {
    if (hours.value === "") {
      return 0;
    } else {
      return parseInt(hours.value) * 3600;
    }
  };

  const Minute = () => {
    if (minutes.value === "") {
      return 0;
    } else {
      return parseInt(minutes.value) * 60;
    }
  };

  const Second = () => {
    if (seconds.value === "") {
      alert("Please enter the second value");
      return 0;
    } else {
      return parseInt(seconds.value);
    }
  };

  let totalSeconds = Hour() + Minute() + Second();
  if (totalSeconds <= 0) {
    alert("Please enter a valid time greater than zero.");
    return;
  } else {
    time.push({ remaining: totalSeconds, timerId: null });
    const index = time.length - 1;
    startTimer(index);
    updateTimersDisplay();
    hours.value = "";
    minutes.value = "";
    seconds.value = "";
    updateTimersDisplay();
  }
};

const deleteTimer = (index) => {
  clearInterval(time[index].timerId); // Clear the interval to stop the timer
  time.splice(index, 1); // Remove the timer from the array
  updateTimersDisplay(); // Update the display
};
const StopTimer = (index) => {
  clearInterval(time[index].timerId); // Clear the interval to stop the timer
  updateTimersDisplay(); // Update the display
  pause = true;

  if (pause) {
  }
};
document.getElementById("set_time").addEventListener("click", () => setTime());