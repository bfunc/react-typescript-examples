import React from "react";

interface PermissionContextInterface {
  id: string;
  name: string;
  permission: boolean;
}

const PermissionContext = React.createContext<PermissionContextInterface>({
  /*   id: "1",
  name: "Peter", */
  permission: false,
});

export default () => {
  return (
    <div>
      <WithPermission name={"Peter is the name"}>
        <User />
      </WithPermission>
    </div>
  );
};

// Provider in your app

const sample: PermissionContextInterface = {
  id: "#first",
  name: "ReactTypescript",
  permission: true,
};

const WithPermission = ({
  children,
}: React.PropsWithChildren<{ name: string }>) => (
  <PermissionContext.Provider value={sample}>
    {children}
  </PermissionContext.Provider>
);

// Consume in your app

const User = () => {
  const ctx = React.useContext(PermissionContext);

  const id: string = ctx.id;
  const name: string = ctx.name;
  const permission: boolean = ctx.permission;

  return (
    <div>
      id:{id}, name: {name}, permission: {permission ? "v" : "x"}
    </div>
  );
};
