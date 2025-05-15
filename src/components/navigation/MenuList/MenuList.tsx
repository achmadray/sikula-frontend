import { useId } from '@mantine/hooks';
import { Link } from 'react-router-dom';

type Navigation = {
  title: string;
  href: string;
  icon: React.ElementType; 
  color?: string;
  subMenu?: { title: string; href: string }[]; 
};

const MenuItem: React.FC<Navigation> = ({
  title,
  href,
  icon: IconComponent,
  color = 'bg-gradient-to-r from-blue-700 to-blue-400',
  subMenu = [],
}) => {
  return (
    <div className="relative">
      <Link to={href}>
        <div className="cursor-pointer flex flex-col items-center justify-center">
          <div
            className={`${color} rounded-xl w-14 h-14 text-white shadow-md flex justify-center items-center`}
          >
            <IconComponent size={37} />
          </div>
          <h3 className="text-dark-700 font-semibold mt-2 text-center px-1" style={{ fontSize: "13px", marginTop: "5px" }}>
            {title}
          </h3>
        </div>
      </Link>

      {subMenu.length > 0 && (
        <div className="pl-4 mt-2">
          {subMenu.map((item, index) => (
            <Link to={item.href} key={index}>
              <div className="text-sm text-gray-600">{item.title}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
type Props = {
  navigations: Navigation[];
};

export const MenuList: React.FC<Props> = ({ navigations }) => {
  const id = useId();

  return (
    <div className="mb-6 pb-3">
      <div className="grid grid-cols-4 grid-rows-2 mx-2 gap-y-4">
        {navigations.map((nav, i) => (
          <MenuItem key={`${id}_${i}`} {...nav} />
        ))}
      </div>
    </div>
  );
};
