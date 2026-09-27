import OrderSidebar from "@/components/order/orderSidebar";
import OrderSummary from "@/components/orderSummary";

export default function RootLayout({children} : Readonly<{ children: React.ReactNode; }>)
{
  return (
    <>
    {/* pt-14 clears the fixed navbar; the three panes stack on phones and sit side by side from md up */}
    <div className="pt-14 md:flex">
        <OrderSidebar />
        <main className="p-5 md:h-[calc(100vh-3.5rem)] md:flex-1 md:overflow-y-auto">
          {children}
        </main>
        <OrderSummary />
    </div>
    </>
  )
}
