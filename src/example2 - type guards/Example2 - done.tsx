import React, { useEffect, useState } from "react";

type PermissionPending = { permission: boolean };
type PermissionReceived = { id: string; name: string; permission: boolean };
type GetPermission<T> = T extends PermissionReceived
  ? PermissionReceived
  : PermissionPending;
type Permission = PermissionPending | PermissionReceived;
type PermissionForContext = GetPermission<Permission>;
type PermissionForConsumer = GetPermission<PermissionReceived>;

const initPermission = {
  permission: false,
};

const isPermissionForConsumer = (
  permission: Permission
): permission is PermissionForConsumer => {
  return "name" in permission;
};

const PermissionContext =
  React.createContext<PermissionForContext>(initPermission);

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
      const sample: PermissionForContext = {
        id: "#first",
        name: "ReactTypescript",
        permission: true,
      };
      setPermission(sample);
    }, 1000);
  }, []);

  return (
    <PermissionContext.Provider value={permission}>
      {children}
    </PermissionContext.Provider>
  );
};

// Consume in your app

const User = () => {
  const ctx = React.useContext(PermissionContext);
  if (!isPermissionForConsumer(ctx)) {
    return <div>Loading</div>;
  }

  const id: string = ctx.id;
  const name: string = ctx.name;
  const permission: boolean = ctx.permission;

  return (
    <div>
      id:{id}, name: {name}, permission: {permission ? "v" : "x"}
    </div>
  );
};
