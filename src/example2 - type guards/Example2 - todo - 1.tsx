import React from "react";

type PermissionPending = { permission: boolean };
type PermissionReceived = { id: string; name: string; permission: boolean };
type GetPermission<T> = any;

type RequiredPermissionForContext = GetPermission<
  PermissionPending | PermissionReceived
>;
type RequiredPermissionForConsumer = GetPermission<PermissionReceived>;

const PermissionContext = React.createContext<RequiredPermissionForContext>({
  // id: "1",
  // name: "Peter",
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

const sample: RequiredPermissionForContext = {
  /*   id: "#first",
  name: "ReactTypescript", */
  permission: true,
};

const WithPermission = ({
  children,
}: React.PropsWithChildren<{ name: string }>) => (
  <PermissionContext.Provider value={sample}>
    <>
      <div>{children}</div>
    </>
  </PermissionContext.Provider>
);

// Consume in your app

const User = () => {
  // PermissionReceived
  const ctx: RequiredPermissionForConsumer =
    React.useContext(PermissionContext);

  const id: string = ctx.id;
  const name: string = ctx.name;
  const permission: boolean = ctx.permission;

  return (
    <div>
      Name: {name}, permission: {permission ? "v" : "x"}, id:{id || "--"}
    </div>
  );
};
