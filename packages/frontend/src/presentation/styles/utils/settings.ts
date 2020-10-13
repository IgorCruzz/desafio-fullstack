export function getSettings() {
  let settings = null;

  const data = localStorage.getItem('settings');

  if (data) {
    settings = JSON.parse(data);
  }

  return settings;
}

export function setSettings(settings: string) {
  localStorage.setItem('settings', JSON.stringify(settings));
}