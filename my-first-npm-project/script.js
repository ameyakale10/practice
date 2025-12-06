// plugins from the script tags
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// start with user's timezone
let currentTimezone = dayjs.tz.guess();

function formatTimezoneLabel(tz) {
  return tz.replace("/", " / ").replace("_", " ");
}

function renderClock() {
  const now = dayjs().tz(currentTimezone);

  document.getElementById("time-display").textContent = now.format("HH:mm:ss");
  document.getElementById("date-display").textContent = now.format(
    "dddd, D MMM, YYYY"
  );
  document.getElementById("timezone-label").textContent =
    formatTimezoneLabel(currentTimezone);
}

renderClock();
setInterval(renderClock, 1000);

MicroModal.init();

const openBtn = document.getElementById("change-timezone-btn");
const applyBtn = document.getElementById("apply-timezone-btn");
const selectEl = document.getElementById("timezone-select");

openBtn.addEventListener("click", () => {
  // pre-select current timezone if present
  if ([...selectEl.options].some((o) => o.value === currentTimezone)) {
    selectEl.value = currentTimezone;
  }
  MicroModal.show("timezone-modal");
});

applyBtn.addEventListener("click", () => {
  currentTimezone = selectEl.value;
  console.log("New timezone selected:", currentTimezone);
  renderClock();
  MicroModal.close("timezone-modal");
});
