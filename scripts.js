document.addEventListener('DOMContentLoaded', () => {
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      // Featured items on home page
      const featuredContainer = document.getElementById('featured-products');
      if (featuredContainer) {
        products.slice(0, 2).forEach(product => {
          const card = document.createElement('div');
          card.className = 'product-card';
          const img = document.createElement('img');
          img.src = product.images && product.images.length > 0 ? product.images[0] : '';
          img.alt = product.name;
          const name = document.createElement('h3');
          name.textContent = product.name;
          const desc = document.createElement('p');
          desc.textContent = product.description;
          const link = document.createElement('a');
          link.href = `product.html?id=${product.id}`;
          link.textContent = 'View Details';
          card.appendChild(img);
          card.appendChild(name);
          card.appendChild(desc);
          card.appendChild(link);
          featuredContainer.appendChild(card);
        });
      }
      // Products listing page
      const productsContainer = document.getElementById('products-list');
      if (productsContainer) {
        products.forEach(product => {
          const card = document.createElement('div');
          card.className = 'product-card';
          const img = document.createElement('img');
          img.src = product.images && product.images.length > 0 ? product.images[0] : '';
          img.alt = product.name;
          const name = document.createElement('h3');
          name.textContent = product.name;
          const desc = document.createElement('p');
          desc.textContent = product.description;
          const link = document.createElement('a');
          link.href = `product.html?id=${product.id}`;
          link.textContent = 'View Details';
          card.appendChild(img);
          card.appendChild(name);
          card.appendChild(desc);
          card.appendChild(link);
          productsContainer.appendChild(card);
        });
      }
      // Product detail page
      const detailContainer = document.getElementById('product-detail');
      if (detailContainer) {
        const params = new URLSearchParams(window.location.search);
        const id = parseInt(params.get('id'));
        const product = products.find(p => p.id === id);
        if (product) {
          const title = document.createElement('h2');
          title.textContent = product.name;
          const desc = document.createElement('p');
          desc.textContent = product.description;
          const gallery = document.createElement('div');
          gallery.className = 'gallery';
          (product.images || []).forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = product.name;
            gallery.appendChild(img);
          });
          (product.videos || []).forEach(src => {
            const video = document.createElement('video');
            video.controls = true;
            const source = document.createElement('source');
            source.src = src;
            source.type = 'video/mp4';
            video.appendChild(source);
            gallery.appendChild(video);
          });
          detailContainer.appendChild(title);
          detailContainer.appendChild(desc);
          detailContainer.appendChild(gallery);
          const rentBtn = document.createElement('a');
          // Link the call‑to‑action on the product page to the contact page.
          // We no longer collect rental information via a separate form, so send
          // visitors directly to our contact page where they can reach out
          // via email or social media.  The product ID is not needed here.
          rentBtn.href = `contact.html`;
          rentBtn.textContent = 'Contact Us to Rent This Item';
          rentBtn.className = 'btn';
          detailContainer.appendChild(rentBtn);
        } else {
          detailContainer.textContent = 'Product not found.';
        }
      }
      // Rent form populate dropdown
      const itemSelect = document.getElementById('item-select');
      if (itemSelect) {
        // The rent form has been removed in favour of a contact page,
        // so the item dropdown is no longer populated.
        // This block is intentionally left blank to avoid errors if
        // legacy markup persists.
      }
    });

  // Review list
  const reviewList = document.getElementById('review-list');
  if (reviewList) {
    const stored = JSON.parse(localStorage.getItem('reviews') || '[]');
    stored.forEach(r => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${r.name}</strong>: ${r.comment}`;
      reviewList.appendChild(li);
    });
    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('review-name').value.trim();
      const comment = document.getElementById('review-comment').value.trim();
      if (name && comment) {
        const review = { name, comment };
        stored.push(review);
        localStorage.setItem('reviews', JSON.stringify(stored));
        const li = document.createElement('li');
        li.innerHTML = `<strong>${review.name}</strong>: ${review.comment}`;
        reviewList.appendChild(li);
        reviewForm.reset();
        alert('Thank you for your review!');
      }
    });
  }
  // Rent form submission
  const rentForm = document.getElementById('rent-form');
  if (rentForm) {
    // No action is performed here because we removed the rent form.
    // If the form still exists in the markup for any reason, prevent
    // default submission to avoid page reloads.
    rentForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }
});
