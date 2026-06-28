import { createContext, useContext, useEffect, useState } from "react";

 

const AuthContext = createContext(null);

 

const STORAGE_KEY_SESSION = "ors_auth_user";

const STORAGE_KEY_USERS = "ors_users";

 

// Seed user list with the demo account.

const DEFAULT_USERS = [

  {

    email: "test@gmail.com",

    password: "123456",

    name: "Test User",

    contact: "9876543299",

    extension: "7777",

    defaultStartPoint: "CT",

  },

];

 

function loadUsers() {

  try {

    const stored = localStorage.getItem(STORAGE_KEY_USERS);

    if (!stored) return DEFAULT_USERS;

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_USERS;

  } catch {

    return DEFAULT_USERS;

  }

}

 

function loadSession() {

  try {

    const stored = localStorage.getItem(STORAGE_KEY_SESSION);

    return stored ? JSON.parse(stored) : null;

  } catch {

    return null;

  }

}

 

function stripPassword(user) {

  const { password, ...safe } = user;

  return safe;

}

 

export function AuthProvider({ children }) {

  const [users, setUsers] = useState(loadUsers);

  const [user, setUser] = useState(loadSession);

 

  useEffect(() => {

    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));

  }, [users]);

 

  useEffect(() => {

    if (user) {

      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(user));

    } else {

      localStorage.removeItem(STORAGE_KEY_SESSION);

    }

  }, [user]);

 

  const login = ({ email, password }) => {

    const found = users.find(

      (u) =>

        u.email.toLowerCase() === email.toLowerCase() &&

        u.password === password

    );

    if (!found) return { ok: false, error: "Invalid email or password" };

    setUser(stripPassword(found));

    return { ok: true };

  };

 

  const logout = () => setUser(null);

 

  const signup = (newUser) => {

    const exists = users.some(

      (u) => u.email.toLowerCase() === newUser.email.toLowerCase()

    );

    if (exists) {

      return { ok: false, error: "An account with this email already exists" };

    }

    setUsers((prev) => [...prev, newUser]);

    setUser(stripPassword(newUser));

    return { ok: true };

  };

 

  const updateProfile = (updates) => {

    if (!user) return { ok: false };

    const safeUpdates = { ...updates };

    delete safeUpdates.email; // email is the identifier — not editable here

    setUsers((prev) =>

      prev.map((u) =>

        u.email.toLowerCase() === user.email.toLowerCase()

          ? { ...u, ...safeUpdates }

          : u

      )

    );

    setUser((prev) => ({ ...prev, ...safeUpdates }));

    return { ok: true };

  };

 

  const value = {

    user,

    isAuthenticated: Boolean(user),

    login,

    logout,

    signup,

    updateProfile,

  };

 

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

 

export function useAuth() {

  const ctx = useContext(AuthContext);

  if (!ctx) {

    throw new Error("useAuth must be used inside an AuthProvider");

  }

  return ctx;

}

 

