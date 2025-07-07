import { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from "../../../components/form/Form";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import FacebookPageBox from "./FacebookPageBox";
import GoogleAnalyticsBox from "./GoogleAnalyticsBox";
import { registerUser } from "../api/action";


export default function AddClientsForm({ onSubmit }: { onSubmit?: (data: any) => void }) {
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [facebookPages, setFacebookPages] = useState<Array<{ fbId: string; name: string }>>([]);
  const [isAdmin, setIsAdmin] = useState<"yes" | "no">("no");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const data = { ...form, facebookPages, admin: isAdmin === "yes" };
    console.log('Submitting data:', data);
    try {
      await registerUser(data);
      toast.success("Client saved successfully!");
      setTimeout(() => {
        navigate("/clients");
      }, 1500);
      onSubmit?.(data);
    } catch (error) {
      toast.error("Failed to save client!");
      console.error('Registration failed:', error);
    }
  };

  return (
    <>
      <PageMeta
        title="React.js Clients Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="Clients. This is the clients we give access. Check Facebook Page, Google Analytics, and Search Console data."
      />
      <PageBreadcrumb pageTitle="Clients" />
      <Form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
          />
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>
        <div>
          <span className="block font-medium mb-2">Admin User?</span>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="isAdmin"
              value="yes"
              checked={isAdmin === "yes"}
              onChange={() => setIsAdmin("yes")}
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="isAdmin"
              value="no"
              checked={isAdmin === "no"}
              onChange={() => setIsAdmin("no")}
            />
            <span className="ml-2">No</span>
          </label>
        </div>
        <div className="flex gap-6 mb-8">
          <FacebookPageBox onAdd={setFacebookPages} />
          <GoogleAnalyticsBox />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
        >
          Add Client
        </button>
      </Form>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ marginTop: '80px' }}
      />
    </>
  );
}
