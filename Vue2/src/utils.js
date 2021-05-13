export function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('delaying');
      return resolve();
    }, ms);
  });
}