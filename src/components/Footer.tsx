import React from "react";
import GithubLogo from "../../public/assets/github-logo";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-custom-primary text-sm p-8 gap-4 backdrop-blur-sm text-custom-text mt-auto">
      <div className="max-w-[1000px] flex flex-col gap-4 justify-between items-center m-auto">
        <p className="max-w-[400px] text-center text-balance">
          Have any thoughts or ideas about the website? Want to contribute?
          Message me on
          <span className="underline ml-1">
            <Link href="https://discordapp.com/users/414710497758281738">
              Discord
            </Link>
          </span>
        </p>
        <Link href={"https://github.com/HarperVenom/moviestack"}>
          <GithubLogo />
        </Link>
        <p>©MovieStack</p>
      </div>
    </div>
  );
}
