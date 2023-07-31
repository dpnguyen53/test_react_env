import React from "react";
import Nhanvien from "./nhanvien";
import Sanpham from "./sanpham";
import Withcard from "./withcard";

const WrapperCard = Withcard(Nhanvien);

export default function AboutPage() {
  return <WrapperCard />;
}
