export async function login(formData: FormData) {
  const user = { email: formData.get("email"), name: "Lee" };

  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ use, expires });

  cookies().set("session", session, { expires, httpOnly: true });
}
