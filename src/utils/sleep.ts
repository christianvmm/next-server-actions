export async function sleep(timeMs = 1000): Promise<void> {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve()
      }, timeMs)
   })
}
