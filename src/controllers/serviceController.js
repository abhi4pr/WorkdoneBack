import Service from "../models/Service.js";

export const createService = async (req, res) => {
  try {
    const { created_by, name, category, price, description, duration } =
      req.body;

    if (!created_by || !name || !price) {
      return res.status(400).json({
        message: "created_by, name and price are required",
      });
    }

    const newService = await Service.create({
      created_by,
      name,
      category,
      price,
      description,
      duration,
    });

    return res.status(201).json({
      message: "Service created successfully",
      service: newService,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create service",
      error: error.message,
    });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ deleted: false })
      .populate("created_by", "name surname profile_pic")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Services fetched successfully",
      services,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch services",
      error: error.message,
    });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params._id).populate(
      "created_by",
      "name surname profile_pic",
    );

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    return res.status(200).json({
      message: "Service retrieved successfully",
      service,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get service",
      error: error.message,
    });
  }
};

export const getServicesByUser = async (req, res) => {
  try {
    const userId = req.params.userid;

    const services = await Service.find({
      created_by: userId,
      deleted: false,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "User services fetched successfully",
      services,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch user services",
      error: error.message,
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const serviceId = req.params._id;
    const bodyData = req.body;

    const updates = {};

    if (bodyData.name) updates.name = bodyData.name;
    if (bodyData.category !== undefined) updates.category = bodyData.category;
    if (bodyData.price !== undefined) updates.price = bodyData.price;
    if (bodyData.description !== undefined)
      updates.description = bodyData.description;
    if (bodyData.duration !== undefined) updates.duration = bodyData.duration;
    if (bodyData.status !== undefined) updates.status = bodyData.status;

    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      { $set: updates },
      { new: true, runValidators: true },
    );

    if (!updatedService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    return res.status(200).json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update service",
      error: error.message,
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params._id,
      { $set: { deleted: true } },
      { new: true },
    );

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    return res.status(200).json({
      message: "Service deleted successfully",
      service,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete service",
      error: error.message,
    });
  }
};
