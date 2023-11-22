import { HiHeart, HiOutlineEye, HiOutlineHeart, HiOutlineInformationCircle, HiOutlineUser, HiOutlineUsers, HiUsers } from "react-icons/hi2";
import Button, { ButtonSecondary } from "../components/button";
import Header from "../components/header";

export default function Home() {
  return (
    <div className="app--home flex flex-col p-5 gap-3">
      <Header/>
      <div className="intro-card relative bg-[var(--bg-secondary)] rounded-lg p-4 border border-[var(--bg-secondary-2)]">
        <HiOutlineInformationCircle className="absolute right-0 top-0 m-5 text-lg text-[var(--accent)]" />
        <h3 className="text-[20px] font-bold">Greetings!</h3>
        <p className="intro-text py-4 text-[13px] opacity-70 ">
          Welcome to Vennt, a serene space for sharing and caring. 🌟
          <br />
          <br />
          Feel free to express yourself without worry - judgment has no place
          here. Your privacy is our priority; no personal data is stored, and
          all conversations are end-to-end encrypted. 🔒
        </p>
      </div>

      <div className="mode-box bg-[var(--bg-secondary)] rounded-lg p-4 border border-[var(--bg-secondary-2)]">
        <h3 className="text-[20px] font-bold">What's on your mind?</h3>
        <p className="intro-text py-4 text-[13px] opacity-70">
          Choose your path on Vennt. Will you share your thoughts or lend a
          caring ear? 🌈
        </p>
        <div className="flex justify-evenly mt-3 gap-3">
          <Button className="flex flex-row items-center justify-center gap-1">Share <HiHeart/></Button>
          <ButtonSecondary className="flex flex-row items-center justify-center gap-1">Listen <HiUsers/></ButtonSecondary>
        </div>
      </div>
    </div>
  );
}
