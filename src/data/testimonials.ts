export type Testimonial = {
  quote: string;
  customerName: string;
  businessOrRole?: string;
  service: string;
  image?: string;
  projectHref?: string;
  approved: boolean;
};

// Add only feedback the customer has explicitly approved for public use.
export const testimonials: readonly Testimonial[] = [];
export const approvedTestimonials = testimonials.filter((item) => item.approved);
