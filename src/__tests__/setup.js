import { expect, afterEach, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { db } from "../firebase";
import { auth } from "../firebase";
import { connectFirestoreEmulator } from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

beforeAll(() => {
  connectFirestoreEmulator(db, "localhost", 5001);
  connectAuthEmulator(auth, "http://localhost:9099");
});
// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
