import { UseGetMyProjectRequest } from "@/api/MyProjectApi";
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
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ListOfProjects = () => {
  const { getProject, isLoading: isGetLoading } = UseGetMyProjectRequest();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }
  const { getAccessTokenSilently } = useAuth0();
  const deleteMyProjectByIdRequest = async (id?: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/project/?id=${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete project");
    }
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
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
          {getProject.data.map((project: Project) => (
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
                    <DropdownMenuItem>
                      <Button
                        onClick={() => {
                          deleteMyProjectByIdRequest(project._id);
                        }}
                      >
                        Delete
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default ListOfProjects;
