import { FaGithub, FaHeart, FaTwitter } from "react-icons/fa6";
import { GiOstrich } from "react-icons/gi";

function Footer() {
  return (
    <div className="left-0 right-0 flex flex-col gap-2 items-center bg-zinc-800 text-xs text-zinc-600 p-2">
      <span className="flex gap-2 items-center">
        <p>Built with</p>
        <FaHeart style={{ fill: "url(#blue-gradient)" }} />
        <p>by Lightning Digital Entertainment</p>
      </span>
      <div className="flex gap-8">
        <a href="https://github.com/lightning-digital-entertainment/cashu-address">
          <FaGithub className="hover:text-purple-700" />
        </a>
        <a href="https://twitter.com/lde_lightning">
          <FaTwitter className="hover:text-purple-700" />
        </a>
        <a href="https://primal.net/p/npub1mhcr4j594hsrnen594d7700n2t03n8gdx83zhxzculk6sh9nhwlq7uc226">
          <GiOstrich className="hover:text-purple-700" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
