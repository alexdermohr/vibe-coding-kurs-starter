import test from "node:test";
import assert from "node:assert/strict";
import { pickRandom } from "./app.js";

test("pickRandom liefert bei leerer Liste null", () => {
  assert.equal(pickRandom([]), null);
});

test("pickRandom nutzt die Zufallsposition", () => {
  assert.equal(pickRandom(["a", "b", "c"], () => 0.5), "b");
});
