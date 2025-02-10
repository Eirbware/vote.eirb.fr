import EirbwareNoTextLogo from '@assets/logos/eirbware_no_text.png';
import BdeLogo from '@assets/logos/bde.png';
import LinkIcon from '@assets/icons/link.svg';

export const Footer = () => {
  return (
    <div className="p-2">
      <hr className="border-t border-gray-300 my-3" />

      <div className="flex flex-col max-w-5xl mx-auto gap-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-row gap-4 items-center">
            <img src={BdeLogo} alt="Logo BDE" className="h-12" />
            <img
              src={EirbwareNoTextLogo}
              alt="Logo Eirbware"
              className="h-12"
            />
          </div>

          <div className="flex flex-row gap-4 items-center">
            <a
              href="https://eirb.fr"
              className="flex items-center text-blue-500 hover:underline text-sm"
            >
              <img src={LinkIcon} alt="Lien eirb.fr" className="h-4 w-4 mr-2" />
              eirb.fr
            </a>
            <a
              href="https://bde.eirb.fr"
              className="flex items-center text-blue-500 hover:underline text-sm"
            >
              <img
                src={LinkIcon}
                alt="Lien bde.eirb.fr"
                className="h-4 w-4 mr-2"
              />
              bde.eirb.fr
            </a>
            <a
              href="https://eirbware.eirb.fr"
              className="flex items-center text-blue-500 hover:underline text-sm"
            >
              <img
                src={LinkIcon}
                alt="Lien eirbware.eirb.fr"
                className="h-4 w-4 mr-2"
              />
              eirbware.eirb.fr
            </a>
          </div>
        </div>

        <hr className="border-t border-gray-300 my-1" />

        <div className=" text-sm text-left text-gray-600">
          <p>Coryright © {new Date().getFullYear()} BDE et Eirbware</p>
        </div>
      </div>
    </div>
  );
};
