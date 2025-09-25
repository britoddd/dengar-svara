import { redirect, RedirectType } from "next/navigation";

export default function handleLogoClick() {
  redirect("/", RedirectType.push);
}
