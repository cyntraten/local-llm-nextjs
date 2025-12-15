"use client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center h-full">
      <div className="w-full max-h-screen">{children}</div>
    </div>
  );
}
