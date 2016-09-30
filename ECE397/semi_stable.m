% Script plotting phase portraits of non-linear bifurcations [Fig1]

% init system and states
number = 1;
for a_range = -3:0.1:3

    g = 9.81;
    L = 1;
    a = a_range;
    b = 0.1;
    ss = @(t,Z) [Z(2)+Z(1)*(a-Z(1)^2-Z(2)^2); -Z(1)+Z(2)*(a-Z(1)^2-Z(2)^2)];
    Z1 = linspace(-pi,pi,25);
    Z2 = linspace(-pi,pi,25);

    % Generate Meshgrid for numerically solving
    [x,y] = meshgrid(Z1,Z2);
    size(x)
    size(y)

    % Establish U and V vectors
    u = zeros(size(x));
    v = zeros(size(y));

    % Init Loop over Vector field to compute Derivatives
    t = 0;
    for i = 1:numel(x)
        Theta_d = ss(t,[x(i); y(i)]);
        u(i) = Theta_d(1);
        v(i) = Theta_d(2);
        Mag = sqrt(u(i)^2+v(i)^2);
        u(i) = u(i)/Mag;
        v(i) = v(i)/Mag;
    end

    %Plot our vector field
    figure
    quiver(x,y,u,v,'r'); figure(gcf)
    xlabel('X')
    ylabel('Y')
    axis tight equal;

    hold on

    for x_range = [-1,0,1]
        for Z_sol = -10:1:10
            [ts,ys] = ode45(ss,[0,10],[x_range;Z_sol]);
            plot(ys(:,1),ys(:,2),'b');
            %plot(-ys(:,1),ys(:,2),'b')
            %plot(ys(1,1),ys(1,2),'bo') %start of contour
            %plot(ys(end,1),ys(end,2),'ks') %end of contour
        end
    end

    axis([-2 2 -2 2])
    grid on

    s1 = 'figure_';
    s2 = num2str(number);
    s3 = '.jpg';
    filo = strcat(s1,s2,s3);
    number = number+1;

    doc saveas
    saveas(gcf,filo);

end
