export class AppError extends Error {
   constructor(message: string) {
      super(message) // Pass the message to the base Error class
      this.name = 'AppError' // Set the name to your custom error's name

      // Ensure the prototype chain is correctly set up (for instanceof checks)
      Object.setPrototypeOf(this, new.target.prototype)
   }
}

export class UnauthenticatedError extends AppError {
   constructor() {
      super('Unauthenticated.')
   }
}
