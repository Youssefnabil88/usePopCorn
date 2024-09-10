import { Children, useState } from "react";
import BoxList from "./Box";
import WatchedList from "./WhatcedList";

export default function Main({ children }) {
  return <main className="main">{children}</main>;
}
