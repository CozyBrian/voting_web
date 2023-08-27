const Instructions = () => {
  return (
    <div className="w-1/2 h-screen bg-[#2A17FF] rounded-r-2xl text-white flex items-center justify-center">
      <div className="w-[574px] flex flex-col gap-4">
        <h1 className="mx-auto text-4xl font-bold my-10">How to Vote?</h1>
        <p className="mx-4">
          <strong>Step 1:</strong> Type in your username and password.
        </p>
        <p className="mx-4">
          <strong>Step 2:</strong> Select biometric authentication if you are voting from a polling station. You would then be  authenticated by placing your finger on a biometric sensor. After which you can proceed to vote.
        </p>
        <p className="mx-4">
          <strong>Step 3:</strong>  If you’re voting from your home select OTP authentication, a one time password would then be sent to your phone number as a text message. Input the one time password to be authenticated then proceed with voting.
        </p>
      </div>
    </div>
  );
};

export default Instructions;
