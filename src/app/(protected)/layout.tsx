import Navbar from './_components/Navbar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <Navbar />
    </>
  );
};

export default ProtectedLayout;
