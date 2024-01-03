const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='min-h-screen w-full flex items-center justify-between'>
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
