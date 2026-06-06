import FlowingMenu, { type FlowingMenuItem } from "@/components/flowing-menu/flowing-menu";

const demoItems: FlowingMenuItem[] = [
  {
    link: "#",
    text: "Mojave",
    image: "https://picsum.photos/600/400?random=1",
  },
  {
    link: "#",
    text: "Sonoma",
    image: "https://picsum.photos/600/400?random=2",
  },
  {
    link: "#",
    text: "Monterey",
    image: "https://picsum.photos/600/400?random=3",
  },
  {
    link: "#",
    text: "Sequoia",
    image: "https://picsum.photos/600/400?random=4",
  },
];

export default function FlowingMenuDemoPage() {
  return (
    <main
      data-flowing-menu-demo
      className="-mt-[72px] min-h-screen bg-[#05030a] p-0 text-white"
    >
      <style>
        {`body:has([data-flowing-menu-demo]) nav[aria-label="Main navigation"] { display: none; }`}
      </style>
      <div
        className="relative flex w-full flex-col overflow-hidden border border-[#2d263b]"
        style={{ height: "100vh", borderRadius: "32px" }}
      >
        <FlowingMenu
          items={demoItems}
          speed={15}
          textColor="#ffffff"
          bgColor="#100d14"
          marqueeBgColor="#ffffff"
          marqueeTextColor="#100d14"
          borderColor="#ffffff"
        />
      </div>
    </main>
  );
}
