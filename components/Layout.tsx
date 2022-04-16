import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};
