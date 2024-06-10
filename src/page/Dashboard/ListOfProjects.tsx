import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ListOfProjects = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getMyProjectRequest = async () => {
    setLoading(true);
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/project/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get project");
    }
    let jsonData = await response.json();
    setData(jsonData.data);
    setLoading(false);
  };

  const deleteMyProjectByIdRequest = async (id?: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/project/?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      toast.error("Failed to delete project");
      throw new Error("Failed to delete project");
    } else {
      toast.success("Deleted Successfullly");
    }
  };

  useEffect(() => {
    getMyProjectRequest();
    setLoading(false);
  }, [Loading]);

  if (Loading) {
    return <span>Loading...</span>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">img</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Venue</TableHead>
          <TableHead className="hidden md:table-cell">Author</TableHead>
          <TableHead className="hidden md:table-cell">Description</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((project: Project) => (
          <TableRow key={project.title}>
            <TableCell className="hidden sm:table-cell">
              <img
                alt={project.title}
                className="aspect-square rounded-md object-cover"
                height="64"
                src={project.coverPageUrl}
                width="64"
              />
            </TableCell>
            <TableCell className="font-medium">{project.title}</TableCell>
            <TableCell className="font-medium">{project.eventDate}</TableCell>

            <TableCell>{project.venue}</TableCell>
            <TableCell className="hidden md:table-cell">
              {project._id}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {project.shortdesc}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Link to={`/dashboard/edit/${project._id}`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      deleteMyProjectByIdRequest(project._id);
                      setLoading(true);
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ListOfProjects;
