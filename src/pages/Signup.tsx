import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function Signup() {
  // State for managing form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook for navigation
  const { signup } = useAuth(); // Access the signup function from AuthContext
  const { toast } = useToast(); // Access toast notifications

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(formData); // Call the signup function with form data
    toast({
      title: "Account created!",
      description: "You have successfully signed up.",
    });
    navigate("/tasks"); // Redirect to the tasks page after signup
  };

  // Update form data state when input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value, // Dynamically update the relevant field
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input fields for user data */}
          <Input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            name="location"
            placeholder="Location (e.g., Delhi)"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <Input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </Card>
    </div>
  );
}
