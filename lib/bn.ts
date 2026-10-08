const BN = "০১২৩৪৫৬৭৮৯";

export const toBn = (v: string | number) =>
  String(v).replace(/\d/g, (d) => BN[+d]);

export const fromBn = (v: string | number) =>
  Number(
    String(v)
      .replace(/[০-৯]/g, (d) => String(BN.indexOf(d)))
      .replace(/[^\d.-]/g, "")
  );

export const formatPrice = (n: number) =>
  `${new Intl.NumberFormat("bn-BD").format(n)} টাকা`;

export const banglaDate = (d = new Date()) =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);