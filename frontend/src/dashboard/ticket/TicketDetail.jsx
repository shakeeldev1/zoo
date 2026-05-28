import React, { useState } from "react";

import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaTicketAlt,
  FaDollarSign,
  FaLayerGroup,
  FaBoxes,
} from "react-icons/fa";

import {
  toast,
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  useGetAllTicketsQuery,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
  useCreateTicketMutation,
} from "../../redux/api/TicketApi";

const TicketDetail = () => {

  // ================= GET TICKETS =================
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetAllTicketsQuery();

  // ================= MUTATIONS =================
  const [
    createTicket,
    { isLoading: createLoading },
  ] = useCreateTicketMutation();

  const [
    updateTicket,
    { isLoading: updateLoading },
  ] = useUpdateTicketMutation();

  const [deleteTicket] =
    useDeleteTicketMutation();

  // ================= STATES =================
  const [editingId, setEditingId] =
    useState(null);

  const [preview, setPreview] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    ticketQty: "",
    image: null,
  });

  // ================= DATA =================
  const tickets = data?.data || [];

  // ================= HANDLE CHANGE =================
  const handleChange = (
    field,
    value
  ) => {

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      setForm((prev) => ({
        ...prev,
        image: file,
      }));

      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  const resetForm = () => {

    setForm({
      name: "",
      description: "",
      price: "",
      ticketQty: "",
      image: null,
    });

    setPreview(null);

    setEditingId(null);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    // ================= VALIDATION =================
    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.price ||
      !form.ticketQty
    ) {

      return toast.error(
        "Please fill all required fields"
      );
    }

    try {

      const formData = new FormData();

      formData.append(
        "name",
        form.name
      );

      formData.append(
        "description",
        form.description
      );

      formData.append(
        "price",
        form.price
      );

      formData.append(
        "ticketQty",
        form.ticketQty
      );

      // ================= IMAGE =================
      if (form.image) {

        formData.append(
          "ticketimage",
          form.image
        );
      }

      // ================= UPDATE =================
      if (editingId) {

        await updateTicket({
          id: editingId,
          formData,
        }).unwrap();

        toast.success(
          "Ticket updated successfully"
        );

      } else {

        // ================= CREATE =================
        if (!form.image) {

          return toast.error(
            "Please select ticket image"
          );
        }

        await createTicket(
          formData
        ).unwrap();

        toast.success(
          "Ticket created successfully"
        );
      }

      resetForm();

      refetch();

    } catch (error) {

      console.log(error);

      toast.error(
        error?.data?.message ||
        "Something went wrong"
      );
    }
  };

  // ================= EDIT =================
  const handleEdit = (ticket) => {

    setEditingId(ticket._id);

    setForm({
      name: ticket.name || "",
      description:
        ticket.description || "",
      price: ticket.price || "",
      ticketQty:
        ticket.ticketQty || "",
      image: null,
    });

    // IMPORTANT
    setPreview(
      ticket.ticketimage?.url
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= DELETE =================
  const handleDelete = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this ticket?"
      );

    if (!confirmDelete) return;

    try {

      await deleteTicket(
        id
      ).unwrap();

      toast.success(
        "Ticket deleted successfully"
      );

      refetch();

    } catch (error) {

      console.log(error);

      toast.error(
        error?.data?.message ||
        "Delete failed"
      );
    }
  };

  // ================= CANCEL =================
  const handleCancel = () => {

    resetForm();
  };

  return (
    <>
      {/* ================= TOAST ================= */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
      />

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">

        {/* ================= LEFT SIDE ================= */}
        <div className="space-y-5">

          {/* ================= TOP CARD ================= */}
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-2xl font-bold text-[#004f2f]">
                  Ticket Catalog
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Manage all event tickets professionally.
                </p>

              </div>

              {/* ================= STATS ================= */}
              <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-green-50 px-5 py-3 border border-green-100">

                  <div className="flex items-center gap-2">

                    <FaTicketAlt className="text-sm text-[#00633E]" />

                    <p className="text-xs text-gray-500">
                      Tickets
                    </p>

                  </div>

                  <h2 className="text-xl font-bold text-[#00633E]">
                    {tickets.length}
                  </h2>

                </div>

              </div>
            </div>
          </div>

          {/* ================= TABLE ================= */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full min-w-full text-left text-sm">

                <thead>

                  <tr className="border-b border-gray-100 text-gray-500">

                    <th className="py-4 px-4">
                      Ticket
                    </th>

                    <th className="py-4 px-4">
                      Quantity
                    </th>

                    <th className="py-4 px-4">
                      Price
                    </th>

                    <th className="py-4 px-4">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {/* ================= LOADING ================= */}
                  {isLoading ? (

                    <tr>

                      <td
                        colSpan={4}
                        className="py-16 text-center"
                      >

                        <div className="flex flex-col items-center gap-3">

                          <div className="w-12 h-12 border-4 border-[#00633E] border-t-transparent rounded-full animate-spin"></div>

                          <p className="font-semibold text-[#00633E]">
                            Loading Tickets...
                          </p>

                        </div>

                      </td>
                    </tr>

                  ) : isError ? (

                    <tr>

                      <td
                        colSpan={4}
                        className="py-16 text-center text-red-500 font-semibold"
                      >
                        Failed To Load Tickets
                      </td>
                    </tr>

                  ) : tickets.length ===
                    0 ? (

                    <tr>

                      <td
                        colSpan={4}
                        className="py-16 text-center text-gray-500"
                      >
                        No Tickets Available
                      </td>
                    </tr>

                  ) : (

                    tickets.map(
                      (ticket) => (

                        <tr
                          key={
                            ticket._id
                          }
                          className="border-b border-gray-100 hover:bg-gray-50 transition"
                        >

                          {/* ================= IMAGE + NAME ================= */}
                          <td className="py-4 px-4">

                            <div className="flex items-center gap-3">

                              <img
                                src={
                                  ticket
                                    ?.ticketimage
                                    ?.url ||
                                  "https://via.placeholder.com/100"
                                }
                                alt={
                                  ticket.name
                                }
                                className="h-14 w-14 rounded-2xl object-cover border border-gray-200"
                              />

                              <div>

                                <h3 className="font-semibold text-gray-900">
                                  {
                                    ticket.name
                                  }
                                </h3>

                                </div>
                            </div>
                          </td>

                          {/* ================= QUANTITY ================= */}
                          <td className="ml-40 py-4 px-10 ">

                            <div className="inline-flex items-center gap-4 rounded-2xl bg-blue-50 px-4 py-2 border border-blue-100">


                              <div>

                                <h4 className=" text-sm">
                                  {
                                    ticket.ticketQty
                                  }
                                </h4>

                              </div>

                            </div>

                          </td>

                          {/* ================= PRICE ================= */}
                          <td className="py-4 px-4">

                            <div className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-[#00633E] font-semibold border border-green-100">

                              <FaDollarSign className="text-xs" />

                              {
                                ticket.price
                              }

                            </div>
                          </td>

                          {/* ================= ACTIONS ================= */}
                          <td className="py-4 px-4">

                            <div className="flex items-center gap-2">

                              {/* EDIT */}
                              <button
                                onClick={() =>
                                  handleEdit(
                                    ticket
                                  )
                                }
                                className="flex items-center gap-1 rounded-full border border-[#00633E] px-3 py-1.5 text-xs font-medium text-[#00633E] transition hover:bg-[#00633E] hover:text-white"
                              >

                                <FaEdit className="text-[11px]" />

                                Edit

                              </button>

                              {/* DELETE */}
                              <button
                                onClick={() =>
                                  handleDelete(
                                    ticket._id
                                  )
                                }
                                className="flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                              >

                                <FaTrash className="text-[11px]" />

                                Delete

                              </button>

                            </div>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm h-fit sticky top-5">

          {/* ================= TOP ================= */}
          <div className="mb-6">

            <div className="flex items-center gap-3">

              <div className="bg-green-50 p-3 rounded-2xl border border-green-100">

                <FaLayerGroup className="text-[#00633E]" />

              </div>

              <div>

                <h3 className="text-2xl font-bold text-[#004f2f]">
                  {editingId
                    ? "Update Ticket"
                    : "Add Ticket"}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Manage ticket information professionally.
                </p>

              </div>
            </div>
          </div>

          {/* ================= FORM ================= */}
          <form
            className="space-y-5"
            onSubmit={
              handleSubmit
            }
          >

            {/* NAME */}
            <label className="block text-sm font-medium text-gray-700">

              Ticket Name

              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  handleChange(
                    "name",
                    e.target.value
                  )
                }
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#00633E] focus:ring-2 focus:ring-[#00633E]/10"
                placeholder="VIP Ticket"
              />
            </label>

            {/* DESCRIPTION */}
            <label className="block text-sm font-medium text-gray-700">

              Description

              <textarea
                rows={4}
                value={
                  form.description
                }
                onChange={(e) =>
                  handleChange(
                    "description",
                    e.target.value
                  )
                }
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#00633E] focus:ring-2 focus:ring-[#00633E]/10 resize-none"
                placeholder="Enter ticket description"
              />
            </label>

            {/* PRICE */}
            <label className="block text-sm font-medium text-gray-700">

              Price

              <input
                type="number"
                value={form.price}
                onChange={(e) =>
                  handleChange(
                    "price",
                    e.target.value
                  )
                }
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#00633E] focus:ring-2 focus:ring-[#00633E]/10"
                placeholder="100"
              />
            </label>

            {/* ================= TICKET QTY ================= */}
            <label className="block text-sm font-medium text-gray-700">

              Ticket Quantity

              <div className="relative mt-2">

                <input
                  type="number"
                  value={form.ticketQty}
                  onChange={(e) =>
                    handleChange(
                      "ticketQty",
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 pr-16 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  placeholder="50"
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-white px-3 py-2 shadow-sm border border-gray-100">

                  <FaBoxes className="text-blue-600 text-sm" />

                </div>

              </div>

            </label>

            {/* IMAGE */}
            <label className="block text-sm font-medium text-gray-700">

              Ticket Image

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
              />
            </label>

            {/* ================= PREVIEW ================= */}
            {preview && (

              <div className="rounded-3xl overflow-hidden border border-gray-200">

                <img
                  src={preview}
                  alt="Preview"
                  className="h-52 w-full object-cover"
                />

              </div>
            )}

            {/* ================= BUTTONS ================= */}
            <div className="flex flex-wrap gap-3 pt-2">

              <button
                type="submit"
                disabled={
                  createLoading ||
                  updateLoading
                }
                className="flex items-center gap-2 rounded-2xl bg-[#00633E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004f2f]"
              >

                <FaPlus className="text-xs" />

                {editingId
                  ? "Save Changes"
                  : "Add Ticket"}

              </button>

              {editingId && (

                <button
                  type="button"
                  onClick={
                    handleCancel
                  }
                  className="rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default TicketDetail;