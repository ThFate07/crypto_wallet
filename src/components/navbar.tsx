import { ModeToggle } from "../components/ui/mode-toggle";

export default function NavBar() {
  return (
    <div className="h-16 p-5">
      <div className="flex flex-row-reverse max-w-6xl">
        {/* <div>test</div> */}
        <div className="">
          <ModeToggle></ModeToggle>
        </div>

      </div>
    </div>
  );
}
