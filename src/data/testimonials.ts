export type Testimonial = {
  quote: string;
  name: string;
  /** Town or county, e.g. "Nairobi, Kenya". */
  location: string;
  /** Optional photo in /public, used only with the customer's permission. */
  photo?: { src: string; alt: string };
  businessOrRole?: string;
  service?: string;
  /** Must be true only once the customer has approved public use. */
  approved: boolean;
};

// Add only real feedback the customer has explicitly approved for public use.
// The Testimonials section renders nothing while this list has no approved items.
export const testimonials: readonly Testimonial[] = [];
export const approvedTestimonials = testimonials.filter((item) => item.approved);
