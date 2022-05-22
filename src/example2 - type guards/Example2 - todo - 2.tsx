import React, { useEffect, useState } from "react";

type PermissionPending = { permission: boolean };
type PermissionReceived = { id: string; name: string; permission: boolean };
type GetPermission<T> = T extends PermissionReceived
  ? PermissionReceived
  : PermissionPending;
type Permission = PermissionPending | PermissionReceived;
type RequiredPermissionForContext = GetPermission<Permission>;
type RequiredPermissionForConsumer = GetPermission<PermissionReceived>;

const initPermission = {
  // id: "1",
  // name: "Peter",
  permission: false,
};
const PermissionContext =
  React.createContext<RequiredPermissionForContext>(initPermission);

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

const WithPermission = ({
  children,
}: React.PropsWithChildren<{ name: string }>) => {
  const [permission, setPermission] = useState<Permission>(initPermission);
  useEffect(() => {
    setTimeout(() => {
      const sample: RequiredPermissionForContext = {
        id: "#first",
        name: "ReactTypescript",
        permission: true,
      };
      setPermission(sample);
    }, 1000);
  }, []);

  return (
    <PermissionContext.Provider value={permission}>
      <>
        <div>{children}</div>
      </>
    </PermissionContext.Provider>
  );
};

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
