import Donework from "../models/Donework.js";

export const createDonework = async (req, res) => {
  try {
    const { service, customer, provider, scheduled_date, notes } = req.body;

    if (!service || !customer || !provider) {
      return res.status(400).json({
        message: "service, customer and provider are required",
      });
    }

    const donework = await Donework.create({
      service,
      customer,
      provider,
      scheduled_date,
      notes,
    });

    return res.status(201).json({
      message: "Work created successfully",
      donework,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create work",
      error: error.message,
    });
  }
};

export const getCustomerWorks = async (req, res) => {
  try {
    const customerId = req.params.customerid;

    const works = await Donework.find({ customer: customerId })
      .populate("service")
      .populate("provider", "name email")
      .populate("Rating")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Customer works fetched successfully",
      works,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch customer works",
      error: error.message,
    });
  }
};

export const getProviderWorks = async (req, res) => {
  try {
    const providerId = req.params.providerid;
    const { status } = req.query;

    const query = { provider: providerId };

    if (status) {
      query.status = status;
    }

    const works = await Donework.find(query)
      .populate("service")
      .populate("customer", "name email")
      .populate("rewrating")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Provider works fetched successfully",
      works,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch provider works",
      error: error.message,
    });
  }
};

export const getWorkDetailsById = async (req, res) => {
  try {
    const workId = req.params._id;

    const work = await Donework.findById(workId)
      .populate("service")
      .populate("customer", "name email")
      .populate("provider", "name email")
      .populate("rewrating");

    if (!work) {
      return res.status(404).json({
        message: "Work not found",
      });
    }

    return res.status(200).json({
      message: "Work fetched successfully",
      work,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch work",
      error: error.message,
    });
  }
};

export const updateWorkStatus = async (req, res) => {
  try {
    const workId = req.params._id;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "accepted",
      "in_progress",
      "completed",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const updates = { status };

    if (status === "completed") {
      updates.completed_at = new Date();
    }

    const updatedWork = await Donework.findByIdAndUpdate(
      workId,
      { $set: updates },
      { new: true },
    );

    if (!updatedWork) {
      return res.status(404).json({
        message: "Work not found",
      });
    }

    return res.status(200).json({
      message: "Work status updated successfully",
      work: updatedWork,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update work status",
      error: error.message,
    });
  }
};

export const updateWorkDetails = async (req, res) => {
  try {
    const workId = req.params._id;
    const { notes, scheduled_date } = req.body;

    const updates = {};

    if (notes !== undefined) updates.notes = notes;
    if (scheduled_date !== undefined) updates.scheduled_date = scheduled_date;

    const updatedWork = await Donework.findByIdAndUpdate(
      workId,
      { $set: updates },
      { new: true },
    );

    if (!updatedWork) {
      return res.status(404).json({
        message: "Work not found",
      });
    }

    return res.status(200).json({
      message: "Work updated successfully",
      work: updatedWork,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update work",
      error: error.message,
    });
  }
};
